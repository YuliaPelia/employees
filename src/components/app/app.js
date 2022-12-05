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
            ],
            // рядок для пошуку
            term: '',
            filter: 'all'
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

    // 1 аргумент - рядок по якому ми будемо здійснювати пошук працівника
    // 2 аргумент - масив даних який ми будемо фільтрувати
    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }
    // indexOf - шукає кусочки певних рядків


    onUpdateSearch = (term) => {
        this.setState({term});
    } 

    onUpdateFilter = (items, filter) => {
        switch(filter) {
            case 'like': 
                return items.filter(item => item.like);
            case 'moreThen100':
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
    }

    clickBtnFilter = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.onUpdateFilter(this.searchEmp(data, term), filter);

        return (
            <div className='app'>
                <AppInfo employees={employees} increased = {increased}></AppInfo>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}></SearchPanel>
                    <AppFilter filter={filter} clickBtnFilterSelect={this.clickBtnFilter}></AppFilter>
                </div>
    
                <EmployersList 
                data={visibleData} 
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}></EmployersList>
                <EmployeesAddForm onAdd={this.addHuman}></EmployeesAddForm>
            </div>
    
        )
    }
}

export default App;