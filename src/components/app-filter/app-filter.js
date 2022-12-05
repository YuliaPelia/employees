import './app-filter.css';

const AppFilter = (props) => {
    const buttonsData = [
        {name: 'all', label: "Всі працівники"},
        {name: 'like', label: "На підвищення"},
        {name: 'moreThen100', label: "З/П більше 1000$"}
    ];

    const buttons = buttonsData.map(({name, label}) => {
        const active = props.filter === name;
        const clazz = active ? 'btn-light' : 'btn-outline-light';
        return (
            <button className={`btn ${clazz}`}  
                type="button" 
                key={name}
                onClick={() => props.clickBtnFilterSelect(name)}>
                    {label}
            </button>
        )
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export default AppFilter;