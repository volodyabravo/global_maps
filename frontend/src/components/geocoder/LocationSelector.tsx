/**
 * Location selector using geocoding apis
 * @returns 
 */
import styled from "@emotion/styled";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import throttle from 'lodash/throttle';
import { loadScript } from "../../utils";
import { FindPlaces, OSMPlace } from "../../api/nominatim";

export interface LocationSelectorProps {
    // options: ["as"]
}

const autocompleteService = { current: null };

export function LocationSelector(props: LocationSelectorProps) {
    const [value, setValue] = useState<OSMPlace | null>(null);
    const [options, setOptions] = useState<readonly OSMPlace[]>([]);
    const loaded = useRef(false);
    const [inputValue, setInputValue] = useState('');

    const fetch = useMemo(
        () =>
            throttle(
                (
                    request: { input: string },
                    callback: (results?: readonly OSMPlace[]) => void,
                ) => {
                    FindPlaces(request.input).then(result=>{
                        console.log(result)
                        callback(result);
                    })
                },
                200,
            ),
        [],
    );


    useEffect(() => {
        let active = true;

        if (!autocompleteService.current && (window as any).google) {
            autocompleteService.current = new (
                window as any
            ).google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results?: readonly OSMPlace[]) => {
            if (active) {
                let newOptions: readonly OSMPlace[] = [];

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
    }, [value, inputValue, fetch]);


    return <Autocomplete
        id="disabled-options-demo"
        options={options}
        getOptionLabel={(option) =>
            typeof option === 'string' ? option : option.display_name
        }
        filterOptions={(x) => x}
        sx={{ width: 300 }}
        onChange={(event: any, newValue: OSMPlace | null) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Disabled options" />}
    />
}