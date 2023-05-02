
export function Ship(length) {

    const ship = {

        length,
        hits: 0,

        isSunk() {
            return this.hits === this.length
        },

        hit(){
            if (this.hits === this.length){
                throw new Error('Ship is sunk already.')
            }else{
            this.hits++
            }
        }

    }

    return ship;

}