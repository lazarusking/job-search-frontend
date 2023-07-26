export default function LoadingAnimation() {
  return (
    <div className="flex justify-center">
      {/* <p className="justify-center flex items-center">Loading........</p> */}

      <div className="lds-ripple flex justify-center w-full">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
