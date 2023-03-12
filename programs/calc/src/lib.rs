use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;


declare_id!("8HUpvKLtMPXq1mZRkiKyKdgMGQ1S7yKnL1BKokNUoztT");


#[program]
pub mod calc {
    use super::*;

    pub fn create(ctx: Context<Create>, init_message: String) -> ProgramResult {
        let calc = &mut  ctx.accounts.calc;
        calc.greeting = init_message;
        Ok({})
    }

    pub fn add(ctx: Context<Addition>, num1: i64, num2: i64) -> ProgramResult {
        let calc = &mut ctx.accounts.calc;
        calc.result = num1 + num2;
        Ok(())
    }
    
    pub fn sub(ctx: Context<Subtract>, num1: i64, num2: i64) -> ProgramResult {
        let calc = &mut ctx.accounts.calc;
        calc.result = num1 - num2;
        Ok(())
    }
    
    pub fn multiply(ctx: Context<Multiplication>, num1: i64, num2: i64) -> ProgramResult {
        let calc = &mut ctx.accounts.calc;
        calc.result = num1 * num2;
        Ok(())
    }
    
    pub fn divide(ctx: Context<Division>, num1: i64, num2: i64) -> ProgramResult {
        let calc = &mut ctx.accounts.calc;
        calc.result = num1 / num2;
        Ok(())
    }
    
    pub fn exponents(ctx: Context<Exponents>, num1: i64, num2: i64) -> ProgramResult {
        let calc = &mut ctx.accounts.calc;
        calc.result = num1.pow(num2.try_into().unwrap());
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {

    #[account(init, payer=user, space=264)]
    pub calc: Account<'info, Calc>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Addition<'info> {
    #[account(mut)]
    pub calc: Account<'info, Calc>,
}

#[derive(Accounts)]
pub struct Subtract<'info> {
    #[account(mut)]
    pub calc: Account<'info, Calc>,
}

#[derive(Accounts)]
pub struct Multiplication<'info> {
    #[account(mut)]
    pub calc: Account<'info, Calc>,
}

#[derive(Accounts)]
pub struct Division<'info> {
    #[account(mut)]
    pub calc: Account<'info, Calc>,
}

#[derive(Accounts)]
pub struct Exponents<'info> {
    #[account(mut)]
    pub calc: Account<'info, Calc>,
}

#[account]
pub struct Calc {
    greeting: String,
    result: i64
}