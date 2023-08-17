function isPalindrome(x) {
    let result = "";
    for(let i = x.length; i > 0; i--) {
        result+=x[i];
        console.log(result);
    }
    if(result == x) {
        return result;
    } else {
        return result;
    }
}

console.log(isPalindrome(121));