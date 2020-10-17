import React, {Component} from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
	constructor() {
		super();
		this.state = {
        register: false,
        title:null,
        description:null,
        image:null,
        output:null
		};
  }
  // componentDidMount(){
  //   axios.get('https://boiling-plateau-31660.herokuapp.com/data').then((resp)=>{
  //     this.setState({
  //       output:resp.data
  //     })  
  //     console.log(this.state.output);
    
  //   })
  // }
	changeRoute = (id, entries) => {
		this.setState({
			id: id,
			entries,
		});
  };
  
  toggle_register=()=>{
    this.setState({
      register:!this.state.register
    });
  }
  onchange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  onsubmit=()=>{
    const curr_state={title:this.state.title,description:this.state.description,image:this.state.image}
    axios
			.post(
				'https://boiling-plateau-31660.herokuapp.com/',
        curr_state
			)
			.then((resp) => {
        document.getElementById('adding').innerHTML =
        '<p style="margin:0px;color:red">Profile added successfully</p>';
			})
			.catch((err) => {
				document.getElementById('adding').innerHTML =
					'<p style="margin:0px;color:red">Profile not added</p>';
			});
  }

	render() {
		return (
			<div className='App'>
        {
          this.state.register?<button  style={{margin:"20px"}} onClick={this.toggle_register}>Close registration form</button>
          :<button style={{margin:"20px"}} onClick={this.toggle_register}>Open gistration form</button>
        }
        {this.state.register ? (
					<div className="form"> 
            <div>
            <label >Title</label>
            <input onChange={this.onchange} type="text" name="title"/>  
            </div>
            <div>
            <label >Description</label>
            <input  onChange={this.onchange} type="text" name="description"/>
            </div>
            <div>
            <label >Image</label>
            <input onChange={this.onchange} type="text" name="image"/>
            
            </div>
            <button onClick={this.onsubmit}>Submit</button>
            <p id="adding"></p>
          </div>
				) :null
        }
        <div className="cards">
          <div className="card">
            <img src="https://i.pinimg.com/originals/44/ce/2c/44ce2cfa6267fde44790205135a78051.jpg" width="100%" height="40%" />
            <p>fsdfsdfsdfds</p>
            <p>dfsssssssssssssssssssssssssssssssssssssssssssss</p>

          </div>
          <div className="card">
            <img src="https://i.pinimg.com/originals/44/ce/2c/44ce2cfa6267fde44790205135a78051.jpg" width="100%" height="40%" />
            <p>fsdfsdfsdfds</p>
            <p>dfsssssssssssssssssssssssssssssssssssssssssssss</p>

          </div>
          <div className="card">
            <img src="https://i.pinimg.com/originals/44/ce/2c/44ce2cfa6267fde44790205135a78051.jpg" width="100%" height="40%" />
            <p>fsdfsdfsdfds</p>
            <p>dfsssssssssssssssssssssssssssssssssssssssssssss</p>

          </div>
          <div className="card">
            <img src="https://i.pinimg.com/originals/44/ce/2c/44ce2cfa6267fde44790205135a78051.jpg" width="100%" height="40%" />
            <p>fsdfsdfsdfds</p>
            <p>dfsssssssssssssssssssssssssssssssssssssssssssss</p>

          </div>
          <div className="card">
            <img src="https://i.pinimg.com/originals/44/ce/2c/44ce2cfa6267fde44790205135a78051.jpg" width="100%" height="40%" />
            <p>fsdfsdfsdfds</p>
            <p>dfsssssssssssssssssssssssssssssssssssssssssssss</p>

          </div>
          <div className="card">
            <img src="https://i.pinimg.com/originals/44/ce/2c/44ce2cfa6267fde44790205135a78051.jpg" width="100%" height="40%" />
            <p>fsdfsdfsdfds</p>
            <p>dfsssssssssssssssssssssssssssssssssssssssssssss</p>

          </div>
          <div className="card">
            <img src="https://i.pinimg.com/originals/44/ce/2c/44ce2cfa6267fde44790205135a78051.jpg" width="100%" height="40%" />
            <p>fsdfsdfsdfds</p>
            <p>dfsssssssssssssssssssssssssssssssssssssssssssss</p>

          </div>
          <div className="card">
            <img src="https://i.pinimg.com/originals/44/ce/2c/44ce2cfa6267fde44790205135a78051.jpg" width="100%" height="40%" />
            <p>fsdfsdfsdfds</p>
            <p>dfsssssssssssssssssssssssssssssssssssssssssssss</p>

          </div>

        </div>
        
			</div>
		);
	}
}

export default App;
