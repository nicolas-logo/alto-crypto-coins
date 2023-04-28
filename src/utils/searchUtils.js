//const emptyErrorMessage = 'Text can not be empty';
const lengthErrorMessage = 'Text should have at least 3 characters';

const ValidateSearchText = ({searchText}) => {
    /* if (searchText === '') {
        return { error: emptyErrorMessage }
    } */
    if (searchText.length < 3) {
        return { error: lengthErrorMessage }
    }
    
    return { error: null }
 };

 export default ValidateSearchText
     