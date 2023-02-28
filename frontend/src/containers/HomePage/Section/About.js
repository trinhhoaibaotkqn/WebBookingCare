
const About = () => {
    return (
        <div className="section-share section-about">
            <div className="section-content">
                <div className="section-header">
                    <div className="title">Truyền thông nói gì về Hoài Bảo</div>
                </div>
                <div className="content-about">
                    <iframe
                        width="570"
                        height="320"
                        src="https://www.youtube.com/embed/zd66fekPTmg"
                        title="Trót Trao Duyên - NB3 Hoài Bảo | OFFICIAL MUSIC VIDEO"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen>
                    </iframe>
                    {/* <div className="text-content">Why do we use it?
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default About;