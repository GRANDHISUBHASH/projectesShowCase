import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import EachCard from '../EachCard'

import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class ApiCalling extends Component {
  state = {
    selectedOption: 'ALL',
    fetchedData: [],
    isLoading: false,
    failureView: false,
  }

  componentDidMount() {
    this.fetchingData()
  }

  fetchingData = async () => {
    const {selectedOption} = this.state
    this.setState({isLoading: true})

    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${selectedOption}`

    const response = await fetch(apiUrl)
    if (response.ok) {
      const Data = await response.json()
      this.setState({fetchedData: Data.projects, isLoading: false})
    } else {
      this.setState({failureView: true})
    }
  }

  OptionISChanging = event => {
    this.setState(
      {selectedOption: event.target.value, failureView: false},
      this.fetchingData,
    )
  }

  retryButtonISClicked = () => {
    this.fetchingData()
  }

  content = () => {
    const {failureView, isLoading, fetchedData} = this.state

    if (failureView) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button type="button" onClick={this.retryButtonISClicked}>
            Retry
          </button>
        </div>
      )
    }
    if (isLoading) {
      return (
        <div data-testid="loader" className="loader-con">
          <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
        </div>
      )
    }
    return (
      <div>
        <ul>
          {fetchedData.map(eachItem => (
            <EachCard eachItem={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {selectedOption, fetchedData} = this.state
    console.log(fetchedData)

    return (
      <div>
        <Header />
        <div>
          <div>
            <select onChange={this.OptionISChanging} value={selectedOption}>
              {categoriesList.map(eachItem => (
                <option key={eachItem.id} value={eachItem.id}>
                  {eachItem.displayText}
                </option>
              ))}
            </select>
          </div>
          {this.content()}
        </div>
      </div>
    )
  }
}

export default ApiCalling
