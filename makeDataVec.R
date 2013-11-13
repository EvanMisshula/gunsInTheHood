makeDataVec<- function(ab)
    {
        library(rjson)
        vecData <- rep(1,200)
        for(i in 1:200)
            {
                if(is.null(ab$features[[i]]$properties$WIDyPct[[1]])) {
                    vecData[i] <- NA
                } else {
                    vecData[i] <- ab$features[[i]]$properties$WIDyPct[[1]]
                }
            }
        return(vecData)
    }
                
