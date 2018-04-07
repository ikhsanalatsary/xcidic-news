import React from 'react';
import { Card, Dimmer, Image, Loader, Pagination, Responsive, Segment } from 'semantic-ui-react'
import qs from 'querystringify';
import API from '../../utils/api'
import NewsItem from './components/NewsItem'
import paragraph from './paragraph.png'

const api = API.create();
const CancelToken = API.CancelToken;

class Search extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    return{
      q: qs.parse(nextProps.location.search).q
    }
  }

  cancel = null
  state = {
    loading: true,
    count: 0,
    data: [],
    error: '',
    activePage: 1,
    fetching: false,
    currentPage: 1,
    dimmed: false,
    q: qs.parse(this.props.location.search).q
  }

  componentDidMount() {
    this.fetchData()
    window.addEventListener('scroll', this.onScroll, false)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.q !== this.state.q) {
      this.setState({
        loading: true
      }, this.fetchData)
    }
  }

  componentWillUnmount() {
    if (this.cancel) {
      this.cancel('Operation canceled by the user.')
    }
    window.removeEventListener('scroll', this.onScroll, false)
  }

  onScroll = async () => {
    if (
      window.screen.width < 768 &&
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
      (this.state.data.length && this.state.currentPage !== this.state.count) &&
      !this.state.fetching
    ) {
      let nextPage = this.state.currentPage + 1
      this.setState({
          currentPage: nextPage,
          fetching: true,
        })

        let page
        if (this.state.currentPage === 1) {
          page = 2
          this.setState({ currentPage: 2, fetching: true })
        } else {
          page = nextPage
        }
        try {
          let data = [...this.state.data]
          const result = await api.getEverything({
            q: this.state.q,
            sortBy: 'publishedAt',
            page,
          }, {
            cancelToken: new CancelToken(c => {
              // An executor function receives a cancel function as a parameter
              this.cancel = c;
            })
          })
          if (result && result.data) {
            result.data.articles.forEach((item, index) => data.push(item))
            this.setState({
              data,
              fetching: false
            })
          }
        } catch (e) {
          console.log('e', e);
        }
    }
  }

  articleList = (article, i) => <NewsItem article={article} key={i} />

  fetchData = (page = 1) => {
    api.getEverything({
      q: this.state.q,
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
        loading: false,
        dimmed: false,
      });
    })
    .catch(e => {
      this.setState({
        loading: false,
        dimmed: false,
        error: e.message
      })
    })
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState(({ dimmed }) => ({ activePage, dimmed: !dimmed }),
      () => this.fetchData(activePage)
    )
  }

  render() {
    const { loading, error, data, count, activePage, fetching, dimmed } = this.state;
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
        <Dimmer.Dimmable as={Card.Group} dimmed={dimmed} stackable itemsPerRow={3} style={{ marginBottom: 15 }}>
          <Dimmer active={dimmed} inverted>
            <Loader>Loading</Loader>
          </Dimmer>
          {data.map(this.articleList)}
        </Dimmer.Dimmable>
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
        <Responsive
          as={Pagination}
          activePage={activePage}
          onPageChange={this.handlePaginationChange}
          totalPages={count}
          minWidth={768}
          style={{marginBottom: 15}}
        />
        {fetching && <Loader active inline='centered' />}
      </React.Fragment>
    );
  }
}

export default Search;
