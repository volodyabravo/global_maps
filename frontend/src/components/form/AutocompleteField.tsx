import useAutocomplete from '@mui/material/useAutocomplete';
import { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import { getCityByName } from '../../api/themes';

const Label = styled('label')({
    display: 'block',
});

const Input = styled('input')(({ theme }) => ({
    width: 200,
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
    '& li[data-focus="true"]': {
        backgroundColor: '#4a8df6',
        color: 'white',
        cursor: 'pointer',
    },
    '& li:active': {
        backgroundColor: '#2977f5',
        color: 'white',
    },
}));

export default function AutocompleteField(props: {

}) {
    const [value, setValue] = useState<{
        name: string,
        id: string,
        postalcode: string,
        region_name: string,
        short_name: string
    } | null>(null);
    const [inputValue, setInputValue] = useState('');
    let [options, setOptions] = useState<Array<{
        name: string,
        id: string,
        postalcode: string,
        region_name: string,
        short_name: string
    }>>([]);


    useEffect(() => {
        let active = true;

        // if (!autocompleteService.current && window.google) {
        //   autocompleteService.current =
        //     new window.google.maps.places.AutocompleteService();
        // }
        // if (!autocompleteService.current) {
        //   return undefined;
        // }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        (async () => {
            let cities = await getCityByName(inputValue);
            setOptions(cities)
        })()
        return () => {
            active = false;
        };
    }, [inputValue]);



    let {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,

    } = useAutocomplete({
        options: options,
        autoComplete: true,
        getOptionLabel: (option) => option.postalcode,
        value: value,
        filterOptions: (x) => x,
        onChange: (event, newValue) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);
        },
        onInputChange: (event, newInputValue) => {
            setInputValue(newInputValue);
        },
        // filterSelectedOptions:true


    })

    return <div>
        <div {...getRootProps()}>
            <Label {...getInputLabelProps()}>Город</Label>
            <Input {...getInputProps()} />
        </div>
        {groupedOptions.length > 0 ? (
            <Listbox {...getListboxProps()}>
                {groupedOptions.map((option, index) => {
                    // @ts-ignore
                    let key = option.id;
                    return (
                        
                        // @ts-ignore
                        <li {...getOptionProps({ option, key })}>{option.name}</li>
                    )
                })}
            </Listbox>
        ) : null}
    </div>
}