import EditorComponent from './components/Editor/EditorComponent';

const Dashboard = () => {
    const handleQueryChange = (query: string) => {
        console.log(query);
    };
    return (
        <div>
            <EditorComponent onQueryChange={handleQueryChange} />;
        </div>
    );
};

export default Dashboard;
