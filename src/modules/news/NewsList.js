import React from 'react';
import { Card, Dimmer, Grid, Image, Loader, Pagination, Segment } from 'semantic-ui-react'
import API from '../../utils/api'
import NewsItem from './components/NewsItem'

const api = API.create();
const CancelToken = API.CancelToken;

class NewsList extends React.PureComponent {
  cancel = null
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

  componentWillUnmount() {
    if (this.cancel) {
      this.cancel('Operation canceled by the user.')
    }
    console.log('unmount');
  }

  articleList = (article, i) => <NewsItem article={article} key={i} />

  fetchData = (page = 1) => {
    api.getEverything({
      sources: this.props.match.params.sourceId,
      sortBy: 'publishedAt',
      page,
    }, {
      cancelToken: new CancelToken(c => {
        // An executor function receives a cancel function as a parameter
        this.cancel = c;
      })
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
           <Image src='https://react.semantic-ui.com/assets/images/wireframe/short-paragraph.png' />
           <Image src='https://react.semantic-ui.com/assets/images/wireframe/short-paragraph.png' />
           <Image src='https://react.semantic-ui.com/assets/images/wireframe/short-paragraph.png' />
           <Image src='https://react.semantic-ui.com/assets/images/wireframe/short-paragraph.png' />
           <Image src='https://react.semantic-ui.com/assets/images/wireframe/short-paragraph.png' />
           <Image src='https://react.semantic-ui.com/assets/images/wireframe/short-paragraph.png' />
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
