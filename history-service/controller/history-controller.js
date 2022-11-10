import { ormGetRecords, ormStoreRecord } from "../model/history-orm.js";

export async function storeRecord(req, res) {
    try {
        const { username } = req.params;
        const { questionTitle, questionDifficulty } = req.body;

        if (questionTitle && questionDifficulty) {
            const storedRecord = await ormStoreRecord(username, {questionTitle, questionDifficulty});
            if (storedRecord.err) {
                return res.status(400)
                    .json({ message: `Could not save record of question - ${questionTitle} to ${username}!` });
            }

            console.log(`Successfully added ${questionTitle} to ${username}'s records`);

            if (storeRecord.status === 'created') {
                res.status(201);
            } else if (storeRecord.status === 'updated') {
                res.status(200);
            }
            return res.json({ message: `Successfully added ${questionTitle} to ${username}'s records` });
        }

        return res.status(400).json({ message: 'Question Title and/or Question Difficulty is missing!' });
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when storing record'});
    }
}

export async function getRecord(req, res) {
    try {
        const { username } = req.params;
        const level = req.query.level;

        const resp = await ormGetRecords(username);
        if (!resp) {
            return res.status(400).json({ message: 'No records exist for ' + username});
        }
        
        if (resp.err) {
            return res.status(400).json({ message: 'Could not retrieve records for ' + username});
        }

        if (!level) {
            return res.status(200).json({ message: `Successfully retrieved ${username}'s records!`, data: resp});
        }

        // filter the records based on level
        const filteredRecords = resp.records.filter(r => r.questionDifficulty === level) || [];
        const filteredResp = {_id: resp._id, username: resp.username, filteredRecords};

        return res.status(200).json({ message: `Successfully retrieved ${username}'s records!`, data: filteredResp });
    } catch (err) {
        return res.status(500).json({ message: 'Database failure when getting record'});
    }
}
