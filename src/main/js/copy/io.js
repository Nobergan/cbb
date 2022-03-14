const sectionRef = document.getElementById("video2");

const onEntry = (entries, observer) => {
  entries.forEach((entrie) => {
    if (entrie.isIntersecting) {
        sectionRef.play();
      } else {
        sectionRef.pause();
      }
    })
  };

const option = {
  rootMargin: "50px"
};

const io = new IntersectionObserver(onEntry, option);

io.observe(sectionRef);
