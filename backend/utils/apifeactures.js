class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    search() {
        const keyword = this.queryStr.keyword
          ? {
              $or: [
                {
                  venueName: {
                    $regex: this.queryStr.keyword,
                    $options: 'i',
                  },
                },
                {
                  venueAddress: {
                    $regex: this.queryStr.keyword,
                    $options: 'i',
                  },
                },
                {
                  venueCategory: {
                    $regex: this.queryStr.keyword,
                    $options: 'i',
                  },
                },
                // You can add more fields to search here (e.g., establishmentYear, ownershipType, availability, etc.)
              
                 
                {
                    venueType: {
                      $regex: this.queryStr.keyword,
                      $options: 'i',
                    },
                  },
                  {
                    ownershipType: {
                      $regex: this.queryStr.keyword,
                      $options: 'i',
                    },
                  },
              ],
            }
          : {};
    
        console.log(keyword);
        this.query = this.query.find({ ...keyword });
    
        return this;
      }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
    
        const skip = resultPerPage * (currentPage - 1);
    
        this.query = this.query.limit(resultPerPage).skip(skip);
    
        return this;
      }
    }
    
    module.exports = ApiFeatures;