import { RouterProvider } from 'react-router-dom'
import { router } from './router'

export default function App() {
  return <RouterProvider router={router} />
}

// import { useEffect } from "react";
// import { MoviesService } from "./Movies/data/services/MoviesService";

// function App() {
//   useEffect(() => {
//     const test = async () => {
//       try {
//         const popular = await MoviesService.getPopular();

//         console.log(popular);

//         const details = await MoviesService.getMovieDetails(
//           popular[0].id,
//         );

//         console.log(details);

//         const cast = await MoviesService.getCast(details.id);

//         console.log(cast.cast);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     test();
//   }, []);

//   return <div>CineView</div>;
// }

// export default App;