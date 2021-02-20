const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

// gets all members
router.get('/', (req, res)=>{
    res.json(members);
});

// get specific member
router.get('/:id', (req, res)=>{
 
    const found = members.some((member)=>{
        return member.id === parseInt(req.params.id);
    });
    if(found){
        res.json(members.filter((member)=>{
            return member.id === parseInt(req.params.id);
        }));
    }
    else{
        res.status(400).json({msg:`Member with  id:${req.params.id} not found`});
    }
});

// Create member
router.post('/', (req, res)=>{
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        status: req.body.status
    };
    if(!newMember.name || !newMember.status){
        return res.status(400).json({msg:`Please add name and status`});
    }

    members.push(newMember);

    return res.json(members);
    // res.send(req.body);
});

// update member
router.put('/:id', (req, res)=>{

    const found = members.some(member => member.id === parseInt(req.params.id));


    if(found){
        const upMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = upMember.name?upMember.name:member.name;
                member.status = upMember.status?upMember.status:member.status;
                res.json({msg:`Member update`, member});
            }
        });
    }
    else{
        res.status(400).json({msg:`No member with id:${req.params.id}`});
    }
});

// delete member
router.delete('/:id', (req, res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json({
            msg: 'Member deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    }
    else{
        res.status(400).json({msg:`No member with id:${req.params.id}`});
    }

    
});

module.exports = router