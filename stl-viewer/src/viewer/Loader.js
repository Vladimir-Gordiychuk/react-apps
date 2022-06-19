export default class Loader {
    constructor(names, onloaded) {
      this.names = names;
      this.status = {};
      this.onloaded = onloaded;
    }
  
    setResult(key, result) {
      this.status[key] = {
        error: null,
        result: result
      };
      this.checkLoaded();
    }
  
    setError(key, error) {
      this.status[key] = {
        error: error
      };
      alert('Failed to load: ' + key);
      console.log(error);
    }
  
    checkLoaded() {
      if (this.names.every((key) => {
        return (this.status[key] != undefined) && (this.status[key].error == null);
      })) {
        this.onloaded(this.status);
      }
    }
  };
  