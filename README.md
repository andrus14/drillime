# drillime

required: 

```sql
CREATE TABLE `results`(
    `id` SERIAL,
    `name` VARCHAR(100) NOT NULL,
    `correct` INT NOT NULL,
    `incorrect` INT NOT NULL,
    `type` VARCHAR(100) NOT NULL,
    `added` DATETIME NOT NULL
) ENGINE = InnoDB;

```

file api/config.php
```php
<?php

return [
    'dsn' => 'mysql:host=location;dbname=database_name',
    'username' => 'username',
    'password' => 'password',
];

```

api points: 
    - api/save
        - name, correct, incorrect, type (POST)
    - api/results