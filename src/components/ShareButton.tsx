import * as React from 'react'

type ShareButtonState = {
    isShareButtonAvailable: boolean
}

class ShareButton extends React.Component<ShareData, ShareButtonState> {

    constructor(props: ShareData) {
        super(props)
        this.state = {
            isShareButtonAvailable: false
        }
    }

    componentDidMount(): void {
        const isShareButtonAvailable = window.navigator?.share != undefined
        this.setState({ isShareButtonAvailable })
    }

    render(): React.ReactNode {
        if (this.state.isShareButtonAvailable) {
            return (
                <button 
                    className="share" 
                    onClick={() => { 
                        window.navigator.share(this.props)
                            .then(() => { console.log("Share complete") })
                            .catch((reason: any) => { console.log(`Share failed: ${reason}`) })
                    }}>
                    <svg width="17" height="22" viewBox="0 0 17 22" xmlns="http://www.w3.org/2000/svg">
                        <path id="share-img-path" opacity="0.8" d="M8.604 13.8252C9.00293 13.8252 9.33691 13.4912 9.33691 13.1016V3.57373L9.28125 2.18213L9.91211 2.84082L11.313 4.34375C11.4429 4.49219 11.6377 4.56641 11.814 4.56641C12.2036 4.56641 12.4912 4.28809 12.4912 3.90771C12.4912 3.71289 12.417 3.56445 12.2778 3.42529L9.14209 0.400879C8.95654 0.215332 8.78955 0.150391 8.604 0.150391C8.41846 0.150391 8.25146 0.215332 8.06592 0.400879L4.93018 3.42529C4.79102 3.56445 4.70752 3.71289 4.70752 3.90771C4.70752 4.28809 4.99512 4.56641 5.37549 4.56641C5.56104 4.56641 5.75586 4.49219 5.88574 4.34375L7.2959 2.84082L7.92676 2.18213L7.86182 3.57373V13.1016C7.86182 13.4912 8.20508 13.8252 8.604 13.8252ZM3.27881 21.0894H13.9199C15.8589 21.0894 16.833 20.1245 16.833 18.2134V8.95459C16.833 7.04346 15.8589 6.07861 13.9199 6.07861H11.3315V7.57227H13.8921C14.8105 7.57227 15.3394 8.07324 15.3394 9.03809V18.1299C15.3394 19.0947 14.8105 19.5957 13.8921 19.5957H3.29736C2.36963 19.5957 1.85938 19.0947 1.85938 18.1299V9.03809C1.85938 8.07324 2.36963 7.57227 3.29736 7.57227H5.86719V6.07861H3.27881C1.33984 6.07861 0.365723 7.04346 0.365723 8.95459V18.2134C0.365723 20.1245 1.33984 21.0894 3.27881 21.0894Z" fill="white"></path>
                    </svg>
                    <span className="button-text">Share</span>
                </button>
            )
        } else {
            return <></>
        }
    }
}

export default ShareButton