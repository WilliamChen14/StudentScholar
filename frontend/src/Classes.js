
//testing
function ClassesBox({ title, description, image, link }) {
  return (
    <div className="class-box">
      <img src="https://c4.wallpaperflare.com/wallpaper/670/619/698/brain-computer-engineering-science-wallpaper-preview.jpg" alt="Class Image" />
      <div className="class-details">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

function Classes() {
  return (
    <>
        <div> Hello this is classes</div>
    </>
  );
}

export default Classes;
