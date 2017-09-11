import * as fs from 'fs';
import * as path from 'path';

/**
 * Check to see whether the file or folder exists.
 * 
 * @param { string } path the location of the file or folder.
 * @return { Promise }
 */
export function pathExists(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err && err.code === 'ENOENT') {
                return resolve(false);
            } else if (err) {
                return reject(err);
            }

            if (stats.isFile() || stats.isDirectory()) {
                return resolve(true);
            }
        });
    });
}

/**
 * Make a directory and return the file path that was created.
 * 
 * @param { string } dirPath the location of the directory to be created.
 * @returns { Promise }
 */
export function makeDir(dirPath: string): Promise<string | NodeJS.ErrnoException> {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirPath, (err) => {
            // if there is no error or if folder already exists
            if (!err || (err.code === 'EEXIST')) {
                return resolve(dirPath);
            } else {
                return reject(err);
            }
        });
        // fs.exists(dirPath, (exists) => {
        //     if (exists) return resolve(dirPath);

        //     let currentPath = path.resolve(dirPath);
        //     let parent = path.dirname(currentPath);

        //     fs.mkdir(dirPath, (err) => {
        //         // if there is no error or if folder already exists
        //         if (!err || (err.code === 'EEXIST')) {
        //             return resolve(dirPath);
        //         } else {
        //             return reject(err);
        //         }
        //     });
        // });
    });
}

/**
 * Create a directory if it doesn't exist.
 * 
 * @param { string } directory the path of the desired directory.
 * @returns { Promise }
 */
export function ensureDirectory(directory: string): Promise<any> {
    return pathExists(directory)
        .then(itExists => {
            if (itExists) return directory;

            let currentPath = path.resolve(directory);
            let parent = path.dirname(currentPath);

            return ensureDirectory(parent)
                .then(() => makeDir(currentPath));
        });
}

export default ensureDirectory;