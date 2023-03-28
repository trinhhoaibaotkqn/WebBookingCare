import "./Loading.scss";
import ClipLoader from "react-spinners/ClipLoader";
const Loading = (props) => {
    let { isLoading } = props;
    return (
        <div className="loader-container" style={isLoading ? { display: "block" } : { display: "none" }}>
            <div className="loader-content">
                <ClipLoader
                    color="red"
                    loading={true}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    )
}
export default Loading;