

function HeroBanner() {
  return (
    <section className="hero-banner">
     	<input type="radio" name = "slider" id="radio-1" className="slider-state" defaultChecked/>
	    <input type="radio" name = "slider" id="radio-2" className="slider-state"/>
	    <input type="radio" name = "slider" id="radio-3" className="slider-state"/>
        <div className="slider-viewport">
            <div className="slide">
                <img src="" alt="" />
                <div className="slide-content">
                    <span className="slide-tag">Test</span>
                    <h2>Movie Title 1</h2>
                    <p>This is a movie.</p>
                    <a href="" className="slide-btn">More Info</a>
                </div>
            </div>
            <div className="slide">
                <img src="" alt="" />
                <div className="slide-content">
                    <span className="slide-tag">Test</span>
                    <h2>Movie Title 2</h2>
                    <p>This is a movie.</p>
                    <a href="" className="slide-btn">More Info</a>
                </div>
            </div>
            <div className="slide">
                <img src="" alt="" />
                <div className="slide-content">
                    <span className="slide-tag">Test</span>
                    <h2>Movie Title 3</h2>
                    <p>This is a movie.</p>
                    <a href="" className="slide-btn">More Info</a>
                </div>
            </div>
        </div>

        <div className="slider-nav">
            <label htmlFor="radio-1"></label>
            <label htmlFor="radio-2"></label>
            <label htmlFor="radio-3"></label>
        </div>
    </section>
  );
}

export default HeroBanner;