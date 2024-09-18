// import PopupSuccess from "../components/PopupSuccess";
import PopupFail from "../components/PopupFail";

function ResultNoti() {
  return (
    <div>
      <div className="pt-16 sm:px-6 ">
        {/* <PopupSuccess /> */}
        <PopupFail errorType="expired" couponId={1} />
      </div>
    </div>
  );
}

export default ResultNoti;