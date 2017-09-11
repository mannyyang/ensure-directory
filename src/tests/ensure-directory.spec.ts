import * as fs from 'fs';
import * as path from 'path';
import * as del from 'del';
import { ensureDirectory } from '../index';

describe('ensure-directory tests', () => {
    const dir = path.join(__dirname, 'tmp', 'test');

    it('should create directory if it doesn\'t exists', (done) => {
        ensureDirectory(dir)
            .then(dir => {
                const exists = fs.existsSync(dir);
                expect(exists).toBe(true);
                done();
            })
            .catch(err => {
                throw err;
            });
    });

    afterEach(done => {
        del([path.dirname(dir) + '/**'], { force: true })
            .then(() => {
                done();
            });
    });
});