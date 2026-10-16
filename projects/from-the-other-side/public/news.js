const eventSource = new EventSource("/api/news");
const liveContainer = document.getElementById("live-container")


//handle update
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    const story = data.story
    liveContainer.textContent = story
  }

//handle connection loss
  eventSource.onerror = () => {
    console.log("Connection lost. Attempting to reconnect...")
  }