import React, { Component } from 'react'
import { Form, Radio } from 'semantic-ui-react'

const VehicleSelector = (props) => {

    const { value, options = [], destination, vehicleChange, planet, planets } = props;
    const { distance } = planets[planets.findIndex(x => x.name === planet)];
    return (
      <Form style={{ margin: '20px 0' }}>
          {options.map(x => {
            return <Form.Field key={x.name}>
                <Radio
                    label={`${x.name} (${x.left})`}
                    name='radioGroup'
                    value={x.name}
                    checked={value === x.name}
                    onChange={(e, { value }) => vehicleChange(value, destination)}
                    disabled={x.left == 0 || x.max_distance < distance}
                />
            </Form.Field>
            })}
      </Form>
    )
}

export default VehicleSelector;
