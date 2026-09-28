/*
# Update Players Names and Nicknames
Updates player names and nicknames for the team roster.
*/

-- Update player 1: Vortex → VladoSik, Marcus Lindberg → Vlad
UPDATE players SET nickname = 'VladoSik', real_name = 'Vlad' WHERE nickname = 'Vortex';

-- Update player 2: Rift → 1beprofen, Elena Petrova → Alexei
UPDATE players SET nickname = '1beprofen', real_name = 'Alexei' WHERE nickname = 'Rift';

-- Update player 3: Hex → legend, Daniel Kim → Nikolai
UPDATE players SET nickname = 'legend', real_name = 'Nikolai' WHERE nickname = 'Hex';

-- Update player 4: Echo → GoonBall00n, Sofia Andersson → Oleg
UPDATE players SET nickname = 'GoonBall00n', real_name = 'Oleg' WHERE nickname = 'Echo';

-- Update player 5: Surge → ferrkw, Anton Müller → Maksim
UPDATE players SET nickname = 'ferrkw', real_name = 'Maksim' WHERE nickname = 'Surge';
