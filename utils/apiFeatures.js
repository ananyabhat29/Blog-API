class APIFeatures{

    constructor(query, queryString){
        this.query = query;  //the data we should return, i.e the json objects
        this.queryString = queryString; //whaterver you get from express
    }
    
    filter(){
         //1. CREATE A COPY OF THE QUERY
        const queryObj = {...this.queryString};
         //2. ARRAY OF EXCLUDED FIELDS
        const excludedFileds = ['page', 'sort', 'limit', 'fields'];
         //3. LOOP THROUGH ARRAY AND REMOVE FILEDS FROM QUERY
        excludedFileds.forEach(element => delete queryObj[element]);

        //1B ADVANCED FILTERING
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(lte|gte|lt|gt)\b/g, match=> `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));

        //returns entire object
        return this;
    }

    sort(){
        //2 SORTING
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(" ");
            this.query = this.query.sort(sortBy);
        }else{
            //if no sort query specified, sort by createdTime
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitfields(){
        //3 LIMITING FILEDS
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(" ");
            this.query = this.query.select(fields);
        }else{
            //if no sort query specified, sort by createdTime
            this.query = this.query.select('-__v');
        }

        return this;
 
 
    }

    paginate(){
        //4 PAGINATION 
        const page = this.queryString.page * 1 || 1;
        const limit =this.queryString.limit *1 || 100;
        const skip = (page -1) * limit

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;