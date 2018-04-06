import React from 'react'
import PropTypes from 'prop-types'
import { Card, Image, Button } from 'semantic-ui-react'
const propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  make: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  aval: PropTypes.string.isRequired
}

const Car = ({id, picture, name, make, model, year, aval}) => (
  <Card>
    <Image src={picture} />
    <Card.Content>
      <Card.Header>
        {name}
      </Card.Header>
      <Card.Meta>
        <span>
          {make} {year} {model}
        </span>
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
      <div>
        {aval}
      </div>
      <Button disabled={aval !== "In Dealership"}>
       Buy
      </Button>
    </Card.Content>
  </Card>
)

Car.propTypes = propTypes

export default Car
