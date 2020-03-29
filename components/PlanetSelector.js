import React, { useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';

const PlanetSelector = (props) => {
    const { options = [], destination, planetChange, value } = props;

    // comment this out to disable auto select
    useEffect(() => {
        if (value === '') {
            const availableOptions = options.filter(x => !x.disabled);
            availableOptions.length === 6 ? planetChange(availableOptions[parseInt(destination) - 1].value, destination) : null;
        }
    });

    return(
        <>
            <p>Destination { destination }</p>
            <Dropdown
                placeholder='Select destination'
                fluid
                selection
                options={options}
                onChange={(e, { value }) => planetChange(value, destination)}
                value={value}
            />
        </>
    );
}

export default PlanetSelector
