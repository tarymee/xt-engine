import { Loading as LoadingElement } from 'element-ui'

// console.log(LoadingElement)
// console.log(LoadingElement.service())

class Loading {
  loadingCount = 0
  loadingInstance = null

  open () {
    this.loadingCount++
    this.loadingInstance = LoadingElement.service({
      customClass: 'app-loading'
    })
  }

  close () {
    this.loadingCount--
    if (this.loadingCount <= 0) {
      this.loadingCount = 0
      this.loadingInstance.close()
    }
  }
}

const loading = new Loading()

export default loading
