import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CourseItem from '../CourseItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
}

class Courses extends Component {
  state = {courseData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getGetCourses()
  }

  getGetCourses = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const fetchedData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({
        courseData: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderCourseItem = () => {
    const {courseData} = this.state

    return (
      <ul className="courseList-container">
        {courseData.map(eachCourse => (
          <CourseItem courseItemDetails={eachCourse} key={eachCourse.id} />
        ))}
      </ul>
    )
  }

  onClickRetry = () => {
    this.getGetCourses()
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

  renderCourseView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseItem()
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
        <div className="app-container">
          <h1 className="heading">Courses</h1>
          {this.renderCourseView()}
        </div>
      </>
    )
  }
}

export default Courses
