import React from 'react';
import { Card, Dimmer, Image, Input, Loader, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { BASE_ICON_URL } from '../../utils/config'
import defaultImage from './image.png'
import paragraph from './paragraph.png'

class SourceList extends React.PureComponent {
  state = {
    loading: true,
    error: '',
    data: [],
    search: ''
  }

  componentDidMount() {
    import('../../utils/api')
      .then(({ default: api }) => api.create())
      .then(api => api.getSources({}))
      .then(result => this.setState({ loading: false, data: result.data.sources }))
      .catch(err => this.setState({ loading: false, error: err.message }))
  }

  onErrorImage = e => e.target.src = defaultImage

  sourceItem = (source, i) => {
    const src = `${BASE_ICON_URL}?url=${source.url}&size=70..120..200`
    return (
      <Card link key={i} as={Link} to={`/source/${source.id}`}>
        <Card.Content>
          <Image src={src} size='tiny' verticalAlign='middle' onError={this.onErrorImage} />
          <span style={{marginLeft: 10}}>{source.name}</span>
        </Card.Content>
      </Card>
    )
  }

  onChangeInput = (e, { value }) => {
    this.setState({ search: value })
  }

  filter = (source) => {
    if (this.state.search) {
      return source.name.match(new RegExp('('+this.state.search+')','ig'))
    }
    return source
  }

  render() {
    const { loading, error, data } = this.state;
    let content = null;
    if (loading) {
      content = (
        <Segment>
           <Dimmer active inverted>
             <Loader inverted>Loading</Loader>
           </Dimmer>

           <p>
             <Image src={paragraph} />
           </p>
           <p>
             <Image src={paragraph} />
           </p>
           <p>
             <Image src={paragraph} />
           </p>
         </Segment>
      )
    } else if (data && data.length > 0) {
      content = (
        <Card.Group stackable itemsPerRow={4} style={{marginTop: 15}}>
          {data.filter(this.filter).map(this.sourceItem)}
        </Card.Group>
      )
    } else {
      content = (
        <Segment>
          {error}
        </Segment>
      )
    }
    return (
      <React.Fragment>
         <Input fluid icon='search' placeholder='Filter...' onChange={this.onChangeInput} />
        {content}
      </React.Fragment>
    )
  }
}

export default SourceList;
