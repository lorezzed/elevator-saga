{
// // NOTE: no destructuring

// // Parent Handlers.
    init (elevators, floors) {
        console.clear()

        // //  try this out...
        this.elevators = elevators;
        this.floors = floors;

        for (elevator in elevators)
            this.elevatorConstructor(elevators[elevator])
        for (floor in floors)
            this.floorConstructor(floors[floor])
    }
,   update (dt, elevators, floors) {}
// // Private Methods
,   elevators : []
,   floors: []
// ,   tasks: []
// ,   direction (task) {
//         // task.elevator.currentFloor()
//     }
// ,   processTasks () {
//         var task = this.tasks.shift();
//         // var move = this.direction(task)
//     }
,   maybeReduceArray (entity) {
        return entity.constructor === Array ? [...entity] : entity
    }
,   getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
,   getRandomElevator () {
        var elevators = this.elevators
        var chooseElevator = this.getRandomInt( 0, (elevators.length - 1) )
        return elevators[chooseElevator]
    }
    // not exactly 'handling' requests atm... just executing them
    // request -> { method, params, [elevator] }
,   handleRequest (request) {
        var elevator = request.elevator || this.getRandomElevator()
        var method = request.method
        var params = this.maybeReduceArray(request.params)
        elevator[method](params)
        // switch(action) {
            // case 'goToFloor': return floorNum => elevator => elevator[action](floorNum)
        // }
    }
,   events : {
        elevator: {
            idle (elevator, floors) {}
        ,   floor_button_pressed (elevator, floorNumber) {
                this.handleRequest({
                    elevator
                ,   method:'goToFloor'
                ,   params:floorNumber
                })
            }
        ,   passing_floor (floor, direction) {}
        ,   stopped_at_floor (floor) {}
        }
    ,   floor: {
            up_button_pressed (floor) {
                this.handleRequest({
                    method:'goToFloor'
                ,   params:floor.level
                })
            }
        ,   down_button_pressed (floor) {
                this.handleRequest({
                    method:'goToFloor'
                ,   params:floor.level
                })
            }
        }
    }
,   floorConstructor (floor) {
        floor.on('up_button_pressed',   this.events.floor.up_button_pressed.bind(this, floor) )
        floor.on('down_button_pressed', this.events.floor.down_button_pressed.bind(this, floor) )
    }
,   elevatorConstructor (elevator) {
        elevator.on( 'idle',                    this.events.elevator.idle.bind(this, elevator) )
        elevator.on( 'floor_button_pressed',    this.events.elevator.floor_button_pressed.bind(this, elevator) )
        elevator.on( 'passing_floor',           this.events.elevator.passing_floor.bind(this, elevator) )
        elevator.on( 'stopped_at_floor',        this.events.elevator.stopped_at_floor.bind(this, elevator) )
    }
,   log (x) {
        console.log(x)
        return x
    }
}
