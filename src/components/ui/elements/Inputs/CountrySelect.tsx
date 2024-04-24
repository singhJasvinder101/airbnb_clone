"use client"
import Select from "react-select";
import useCountries from "@/hooks/useCountries";

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[],
    region: string;
    value: string
}

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
    value: selectedValue,
    onChange
}) => {
    const { getAll, getByValue } = useCountries();
    return (
        <div>
            <Select
                placeholder="Select a country"
                isClearable
                options={getAll()}
                value={selectedValue}
                onChange={(val) => onChange(val as CountrySelectValue)}
                formatOptionLabel={(option) => {
                    return (
                        <div className="flex items-center gap-3">
                            <div>{option.flag}</div>

                            <div>{option.label},
                                <span className="text-neutral-500 ml-1">
                                    {option.region}
                                </span>
                            </div>
                        </div>
                    )
                }}
                classNames={{
                    control: () => 'p-1 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg',
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6'
                    }
                })}
            />
        </div>
    )
}

