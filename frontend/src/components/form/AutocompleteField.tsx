import useAutocomplete from '@mui/material/useAutocomplete';
import { useEffect, useMemo, useState } from 'react';

import { styled } from '@mui/material/styles';
import { getCityByName } from '../../api/themes';
import { Control, Path, RegisterOptions, useController } from "react-hook-form";
import { throttle } from 'lodash';

export interface CityResult {
    name: string;
    id: string;
    postalcode: string;
    region_name: string;
    short_name: string;
}

interface AutocompleteCityProps<FieldValues> {
    name: Path<FieldValues>;
    control: Control<FieldValues>;
    label?: string;
    rules?: Omit<RegisterOptions<FieldValues, Path<FieldValues>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
}

const Label = styled('label')(`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 20px;

`);

const Input = styled('input')(({ theme }) => ({
    background: "#FFFFFF",
    border: "1px solid #EEEEEE",
    boxSizing: "border-box",
    padding: "10px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "13px",
    lineHeight: "20px",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper),
}));

const Listbox = styled('ul')(({ theme }) => ({
    width: 200,
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: theme.palette.background.paper,
    overflow: 'auto',
    maxHeight: 200,
    border: '1px solid rgba(0,0,0,.25)',
    "li": {
        padding: "10px",
        cursor: "pointer"
    },
    '& li[aria-selected="true"]': {
        backgroundColor: '#4a8df6',
        color: 'white',
        cursor: 'pointer',
    },
    '& li:hover': {
        backgroundColor: '#4a8df6',
        color: 'white',
        cursor: 'pointer',
    },
    '& li:active': {
        backgroundColor: '#2977f5',
        color: 'white',
    },
}));

export default function AutocompleteCity<FieldValues>(props: AutocompleteCityProps<FieldValues>) {
    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState<CityResult | null>(null);
    const [options, setOptions] = useState<readonly CityResult[]>([]);

  

    const {
        field, fieldState
    } = useController({
        name: props.name,
        control: props.control,
        rules: props.rules,
    })

    const fetch = useMemo(
        () =>
            throttle(async (name: string, callback: ((cities:Array<CityResult>) => void) | undefined) => {
                   let cities = await getCityByName(name);
                   callback && callback(cities)
            }, 1000),
        [],
    );

    useEffect(() => {
        let active = true;

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch(inputValue, (results) => {
            if (active) {
           
                let newOptions: CityResult[] = [];
                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }
                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [field.value, inputValue]);



    let {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,

    } = useAutocomplete({
        options: options,
        id: 'autocomplete',
        multiple:false,
        includeInputInList: false,
        filterSelectedOptions: true,
        getOptionLabel: (option) => option.name,
        // @ts-ignore
        defaultValue: field.value,
        filterOptions: (x) => x,
        onChange: (event, newValue) => {
            setValue(() => newValue)
            field.onChange(newValue)
        },
        inputValue: inputValue,
        onInputChange: (event, newInputValue) => {
            setInputValue(newInputValue);
        },
    })

    return <div>
        <Autocomplete {...getRootProps()}>
            <Label {...getInputLabelProps()}>Город</Label>
            <Input {...getInputProps()} />
        </Autocomplete>
        {groupedOptions.length > 0 ? (
            <Listbox {...getListboxProps()}>
                {groupedOptions.map((option, index) => {
                    let city = option as CityResult;
                    return (
                        <li {...getOptionProps({option: city,  index: index })}>{city.name}</li>
                    )
                })}
            </Listbox>
        ) : null}
    </div>
}

const Autocomplete = styled('div')(`
    display:flex;
    flex-direction: column;
`);