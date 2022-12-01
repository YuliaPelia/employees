import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployeesAddForm from '../employers-add-form/employers-add-form'; 

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: false, like: true, id: 1},
                {name: 'Alex M.', salary: 3000, increase: true, like: false, id: 2},
                {name: 'Carl W.', salary: 5000, increase: false, like: false, id: 3}
            ]
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            
            return {
                data: data.filter(i => i.id !== id)
            }
        })
    }

    addHuman = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            like: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {

        // 1 варіант
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id);

        //     const old = data[index];
        //     const newItem = {...old, increase: !old.increase}; // всі всластивості які були всередині обєкта old вони розвернуться і сформують з цього новий обєкт 
        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
        //     return {
        //         data: newArr
        //     }

        // })

        // 2 варіант
        this.setState(({data}) => ({
            data: data.map(item => {
                // якщо ми знаходимо потрібний обєкт ми повертаємо новий обєкт
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                } 
                return item;
            })
        }))
    }


    render() {
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        return (
            <div className='app'>
                <AppInfo employees={employees} increased = {increased}></AppInfo>
    
                <div className="search-panel">
                    <SearchPanel></SearchPanel>
                    <AppFilter></AppFilter>
                </div>
    
                <EmployersList 
                data={this.state.data} 
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}></EmployersList>
                <EmployeesAddForm onAdd={this.addHuman}></EmployeesAddForm>
            </div>
    
        )
    }
}

export default App;