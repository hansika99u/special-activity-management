const auth = async (req, res, next) => {
    try {
        next();
        // To be implemented
    } catch (error) {
        console.log(error);
    }
};

export default auth;
