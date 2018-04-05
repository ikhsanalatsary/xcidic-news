import React from 'react';
import moment from 'moment';
import isUrl from 'is-url';
import { Card, Icon, Image } from 'semantic-ui-react'

export default class NewsItem extends React.PureComponent{
  render() {
    const { article } = this.props;
    return (
      <Card>
        <Image src={article.urlToImage} />
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
          <a>
            <Icon name='user' />
            {isUrl(article.author) || article.author === null ? 'Idem' : article.author}
          </a>
        </Card.Content>
      </Card>
    )
  }
}
