import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane, faFaceSmile, faUpload } from "@fortawesome/free-regular-svg-icons"
import { FileUploadIcon } from "./ExtraIcons"

const Input = () => {
    return (
        <div className='inputbox'>
            <div className="typing">
                <input type="text" placeholder="Send message..." />
            </div>
            <div className="sendicons">
                <FontAwesomeIcon icon={faPaperPlane} size="lg" />
                <FontAwesomeIcon icon={faFaceSmile} size="lg" />
                <FileUploadIcon />
            </div>
        </div>
    )
}

export default Input
