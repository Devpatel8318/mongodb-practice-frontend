// import { useRef } from 'react';
// import EditorComponent from './components/Editor/EditorComponent';
// import callApi from 'src/utils/callApi';
// import Table from 'src/components/Table';

// const Dashboard = () => {
//     const result = useRef<string | null>(null);

//     const handleQueryChange = (query: string) => {
//         result.current = query;
//     };

//     const handleSubmit = () => {
//         console.log('Run query', result.current);

//         callApi('user/answer/1', 'POST', { queryData: result.current });
//     };

//     return (
//         <div>
//             {/* <button
//                 className="mb-1 bg-blue-400 px-4 py-2 m-2 rounded-lg text-gray-800 font-normal"
//                 onClick={handleSubmit}
//             >
//                 Run Query
//             </button> */}
//             {/* <EditorComponent onQueryChange={handleQueryChange} />; */}
//             <Table />
//         </div>
//     );
// };

// export default Dashboard;
export {};
