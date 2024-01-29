import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class CourseDetails extends Component {
  state = {courseDetailsList: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        courseDetailsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderCourseDetails = () => {
    const {courseDetailsList} = this.state
    const {name, imageUrl, description} = courseDetailsList

    return (
      <div className="courseDetails-container">
        <img src={imageUrl} alt={name} className="courseImage" />
        <div className="details-conatiner">
          <h1 className="heading">{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    )
  }

  onClickRetry = () => {
    this.getCourseDetails()
  }

  renderFailureView = () => (
    <div className="failureView-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failureViewImage"
      />
      <h1 className="failureHeading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button className="retryButton" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCourseDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="courseDetailsBg-container">
          {this.renderCourseDetailsView()}
        </div>
      </>
    )
  }
}

export default CourseDetails
