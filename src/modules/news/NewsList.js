import React from 'react';
import { Card, Dimmer, Grid, Image, Loader, Pagination, Segment } from 'semantic-ui-react'
import API from '../../utils/api'
import NewsItem from './components/NewsItem'

const api = API.create();

class NewsList extends React.PureComponent {
  state = {
    loading: true,
    count: 0,
    data: [],
    error: '',
    activePage: 1
  }

  componentDidMount() {
    this.fetchData()
  }

  articleList = (article, i) => <NewsItem article={article} key={i} />

  fetchData = (page = 1) => {
    api.getEverything({
      sources: 'bbc-news, the-verge',
      sortBy: 'publishedAt',
      page,
    })
    .then(result => {
      this.setState({
        data: result.data.articles,
        count: result.data.totalResults,
        loading: false
      });
    })
    .catch(e => {
      this.setState({
        loading: false,
        error: e.message
      })
    })
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState(({ loading }) => ({ activePage, loading: !loading }),
      () => this.fetchData(activePage)
    )
  }

  render() {
    const { loading, error, data, count, activePage } = this.state;
    let content = null;
    if (loading) {
      content = (
        <Segment>
           <Dimmer active inverted>
             <Loader inverted>Loading</Loader>
           </Dimmer>

           <Image src='https://react.semantic-ui.com/assets/images/wireframe/short-paragraph.png' />
         </Segment>
      )
    } else if (data && data.length > 0) {
      content = (
        <Card.Group stackable itemsPerRow={3}>
          {data.map(this.articleList)}
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
        {content}
      <Grid stackable>
        <Grid.Column width={5}>
          <Pagination
            activePage={activePage}
            onPageChange={this.handlePaginationChange}
            totalPages={count}
          />
        </Grid.Column>
      </Grid>
      </React.Fragment>
    );
  }
}

export default NewsList;
