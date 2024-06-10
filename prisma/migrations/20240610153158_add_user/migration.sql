-- Add the userId column with a default value of 1 (assuming user with ID 1 exists)
ALTER TABLE `Post` ADD COLUMN `userId` INT NOT NULL DEFAULT 1;

-- Remove the default value after setting the column (if you don't want it to persist)
ALTER TABLE `Post` ALTER COLUMN `userId` DROP DEFAULT;