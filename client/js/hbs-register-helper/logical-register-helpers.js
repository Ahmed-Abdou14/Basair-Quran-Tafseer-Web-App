//Arithmetics
export function add(n1, n2) {
    return n1 + n2;
}
export function subtract(n1, n2) {
    return n1 - n2;
}

export function eq(n1, n2, options) {
    return n1===n2? options.fn(this): options.inverse(this);
}

export function areSameJuz(suwar, index){
    if(index < 1) return true;
    return suwar[index-1].juz.index !== suwar[index].juz.index
}