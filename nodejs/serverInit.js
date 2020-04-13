import schedulerInit from "./scheduler";
import app from "./server";

schedulerInit();

const PORT = 8080;
const handleListen = () => console.log(`Listening on http://localhost:${PORT}`)

app.listen(PORT, handleListen);