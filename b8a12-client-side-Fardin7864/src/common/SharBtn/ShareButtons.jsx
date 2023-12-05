
const ShareButtons = ({ title, url }) => {
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank', 'width=600,height=400');
  };

  // Add more share functions for other social media platforms if needed

  return (
    <div className=" p-5">
      <button className=" m-1 btn bg-p" onClick={shareOnFacebook}>Share on Facebook</button>
      <button className=" m-1 btn bg-p" onClick={shareOnTwitter}>Share on Twitter</button>
      {/* Add more buttons for other social media platforms */}
    </div>
  );
};

export default ShareButtons;
