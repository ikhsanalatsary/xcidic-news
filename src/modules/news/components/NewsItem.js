import React from 'react';
import moment from 'moment';
import isUrl from 'is-url';
import { Card, Icon, Image } from 'semantic-ui-react'

export default class NewsItem extends React.PureComponent {
  state = {
    color: ''
  }

  defaultImage = 'https://react.semantic-ui.com/assets/images/wireframe/image.png'

  onErrorImage = e => e.target.src = this.defaultImage

  onMouseEnter = e => this.setState({ color: 'blue' })

  onMouseLeave = e => this.setState({ color: '' })

  render() {
    const { article } = this.props;
    let otherProps = this.state.color ? { color: this.state.color } : null
    return (
      <Card link onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} href={article.url} target="_blank" rel="noopener noreferrer" {...otherProps}>
        <Image src={article.urlToImage || this.defaultImage} onError={this.onErrorImage} />
        <Card.Content>
          <Card.Header>
            {article.title}
          </Card.Header>
          <Card.Meta>
            <span className='date'>
              {moment(article.publishedAt).format('LL')}
            </span>
          </Card.Meta>
          <Card.Description>
            {article.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name='user' />
          {isUrl(article.author) || article.author === null ? 'Idem' : article.author}
        </Card.Content>
      </Card>
    )
  }
}
