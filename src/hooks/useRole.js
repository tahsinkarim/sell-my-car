import { useEffect, useState } from "react";

const useRole = email => {
    const [isRole, setIsRole] = useState(false);
    const [isRoleLoading, setIsRoleLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/getRole/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsRole(data[0].role);
                    setIsRoleLoading(false);
                })
        }
    }, [email])
    return [isRole, isRoleLoading]
}

export default useRole;